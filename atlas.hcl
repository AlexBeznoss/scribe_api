variable "token" {
  type    = string
  default = getenv("TURSO_TOKEN")
}

valiable "host" {
  type    = string
  default = getenv("TURSO_HOST")
}

env "turso" {
  url     = "libsql+wss://${var.host}?authToken=${var.token}"
  exclude = ["_litestream*"]
}

env "local" {
  url = "sqlite://dev.db"
}
