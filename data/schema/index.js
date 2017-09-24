// Import schema definition
import SchemaDefinition from './schemaDefinition.graphql';

// Import query
import Query from './query.graphql';

// Import types
import Sound from './sounds.graphql';
import FormatLangPair from './FormatLangPair.graphql';

// Expose the whole set
export default [SchemaDefinition, Query, Sound, FormatLangPair];
