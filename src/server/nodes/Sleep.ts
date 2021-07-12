import Node from '../Node';
import NodeParameter from '../../NodeParameter';

export default class Sleep extends Node {
  constructor(options = {}) {
    super({
      // Defaults
      name: 'Sleep',
      summary: 'Sleep x seconds',
      category: 'Workflow',
      defaultInPorts: ['Input'],
      defaultOutPorts: ['Output'],
      // Explicitly configured
      ...options,
    });
  }

  async run() {
    this.output(this.input());

    return new Promise((resolve) => {
      const wait = setTimeout(() => {
        if (typeof wait !== 'undefined') {
          clearTimeout(wait);
        }
        resolve('Node complete');
      }, parseInt(this.getParameterValue('seconds_to_sleep')) * 1000);
    });
  }

  getParameters() {
    return [...super.getParameters(), NodeParameter.number('seconds_to_sleep').withValue(5)];
  }
}
