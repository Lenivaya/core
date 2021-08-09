import { Node } from '../Node';
import { NodeParameter } from '../../NodeParameter';

export default class Filter extends Node {
  constructor(options = {}) {
    super({
      // Defaults
      name: 'Filter',
      summary: 'Filter nodes by attribute name',
      category: 'Workflow',
      defaultInPorts: ['Input'],
      defaultOutPorts: ['Output', 'Unmatched'],
      // Explicitly configured
      ...options,
    });
  }

  async run() {
    const toMatchAgainst =
      this.getParameterValue('attribute');
    const ports = this.getParameterValue('Output ports');

    const isMatchAgainst = (port) => (feature) => {
      const { original } = feature;

      return toMatchAgainst in original
        ? original[toMatchAgainst] === port
        : false;
    };

    const unmatched = this.input().filter((feature) => {
      const { original } = feature;

      return !(toMatchAgainst in original
        ? ports.includes(original[toMatchAgainst])
        : false);
    });

    ports.forEach((p) => {
      const allMatched = this.input().filter((feature) =>
        isMatchAgainst(p)(feature),
      );

      this.output(allMatched, p);
    });

    this.output(this.input());
    this.output(unmatched, 'Unmatched');
  }

  getDefaultParameters() {
    return [
      ...super.getDefaultParameters(),
      NodeParameter.string('attribute')
        .withValue('name')
        .withDescription('attribute to match against'),
      NodeParameter.string('Output ports')
        .withValue('port')
        .asPort()
        .repeatable(),
      // NodeParameter.select('operator').withOptions(['==']).withValue('=='),
    ];
  }
}
