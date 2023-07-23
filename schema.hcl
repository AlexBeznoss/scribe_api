schema "main" {
}

table "captions" {
  schema = schema.main

  column "id" {
    null = false
    type = integer
    auto_increment = true
  }

  primary_key {
    columns = [
      column.id
    ]
  }

  column "status" {
    type = varchar(255)
  }

  column "url" {
    type = varchar(255)
  }

  column "external_job_id" {
    type = varchar(255)
    null = true
  }

  column "data" {
    type = text
    null = true
  }

  index "captions_url_idx" {
    columns = [
      column.url
    ]
    unique = true
  }
}
