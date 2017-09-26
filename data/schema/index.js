// Import schema definition
import SchemaDefinition from './schemaDefinition.graphql';

// Import query, no mutations yet
import Query from './query.graphql';
import Mutation from './mutation.graphql'

// Import types for API
import Sound from './sounds.graphql';
import FormatLangPair from './FormatLangPair.graphql';

import Endpoint from './endpoints.graphql'

// Expose the whole set
export default [SchemaDefinition, Query, Mutation, Sound, FormatLangPair, Endpoint];
