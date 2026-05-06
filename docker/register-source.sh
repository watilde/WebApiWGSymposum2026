#!/usr/bin/env bash
# Register the Eunomia demo CDM source bundled in broadsea-atlasdb
set -euo pipefail

WEBAPI_URL="${WEBAPI_URL:-http://localhost:8080}"

echo "Registering Eunomia demo CDM source..."

curl -sf -X POST "${WEBAPI_URL}/WebAPI/source/" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceName": "Eunomia Demo CDM",
    "sourceKey": "EUNOMIA",
    "sourceDialect": "postgresql",
    "connectionString": "jdbc:postgresql://db:5432/postgres",
    "username": "postgres",
    "password": "mypass",
    "daimons": [
      {"daimonType": "CDM",        "tableQualifier": "demo_cdm",         "priority": 0},
      {"daimonType": "Vocabulary",  "tableQualifier": "demo_cdm",         "priority": 1},
      {"daimonType": "Results",     "tableQualifier": "demo_cdm_results",  "priority": 0}
    ]
  }' && echo "Source registered successfully." || echo "Source registration failed (may already exist)."
