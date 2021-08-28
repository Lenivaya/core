import {
  Aggregate,
  Clone_,
  Comment,
  Create,
  CreateGrid,
  CreateAttribute,
  CreateCSV,
  CreateJSON,
  CreateSequence,
  // DownloadCSV,
  DownloadJSON,
  // DownloadGeoJSON,
  Evaluate,
  FilterDuplicates,
  Filter,
  Flatten,
  Group,
  HTTPRequest,
  Inspect,
  Log,
  Map,
  OutputProvider,
  RegExpFilter,
  ResolveContextFeatures,
  Sample,
  Sort,
  Sleep,
  ThrowError,
  RemoveAttributes,
  RenameAttributes,
} from './nodes';

import { SerializedNode } from '../types/SerializedNode';
import {
  ApiNodeFactory,
  DefaultNodeFactory,
  ContextNodeFactory,
} from './nodes/factories';
import { Node } from './Node';
import { DataStoryContext } from './DataStoryContext';

export class NodeFactory {
  context: DataStoryContext;
  prototypes = {
    Aggregate,
    Clone_,
    Comment,
    Create,
    CreateAttribute,
    CreateCSV,
    CreateGrid,
    CreateJSON,
    CreateSequence,
    Evaluate,
    Filter,
    FilterDuplicates,
    Flatten,
    Group,
    HTTPRequest,
    Inspect,
    Log,
    Map,
    OutputProvider,
    RegExpFilter,
    ResolveContextFeatures,
    RemoveAttributes,
    RenameAttributes,
    Sample,
    Sleep,
    Sort,
    ThrowError,
    DownloadJSON,
  };

  static withContext(context) {
    return new this(context);
  }

  constructor(context = {}) {
    this.context = context;
  }

  defaultNodes(): {} {
    return DefaultNodeFactory.make(this.prototypes);
  }

  apiNodes(): {} {
    return ApiNodeFactory.make(this.context);
  }

  contextNodes() {
    return ContextNodeFactory.make(this.context);
  }

  all(): object {
    return {
      ...this.defaultNodes(),
      ...this.apiNodes(),
      ...this.contextNodes(),
    };
  }

  find(nodeType) {
    return this.all()[nodeType];
  }

  nodeDescriptions() {
    return Object.values(this.all()).map((node) =>
      node.serialize(),
    );
  }

  hydrate(node: SerializedNode, diagram = null): Node {
    const type = this.prototypes[node.nodeType];

    return new type({
      ...node,
      diagram,
    });
  }
}
