schema "main" {
}

table "atlas_schema_revisions" {
  schema = schema.main
  column "version" {
    null = false
    type = text
  }

  column "description" {
    null = false
    type = text
  }

  column "type" {
    null    = false
    type    = integer
    default = 2
  }

  column "applied" {
    null    = false
    type    = integer
    default = 0
  }

  column "total" {
    null    = false
    type    = integer
    default = 0
  }

  column "executed_at" {
    null = false
    type = datetime
  }

  column "execution_time" {
    null = false
    type = integer
  }

  column "error" {
    null = true
    type = text
  }

  column "error_stmt" {
    null = true
    type = text
  }

  column "hash" {
    null = false
    type = text
  }

  column "partial_hashes" {
    null = true
    type = json
  }

  column "operator_version" {
    null = false
    type = text
  }

  primary_key {
    columns = [column.version]
  }
}

table "captions" {
  schema = schema.main

  column "id" {
    null           = false
    type           = integer
    auto_increment = true
  }

  column "status" {
    null = false
    type = varchar
  }

  column "url" {
    null = false
    type = varchar
  }

  column "title" {
    null = true
    type = varchar
  }

  column "data" {
    null = true
    type = text
  }

  column "created_at" {
    null    = false
    type    = datetime
    default = sql("current_timestamp")
  }

  column "updated_at" {
    null    = false
    type    = datetime
    default = sql("current_timestamp")
  }

  primary_key {
    columns = [column.id]
  }

  index "captions_url_idx" {
    unique  = true
    columns = [column.url]
  }
}
