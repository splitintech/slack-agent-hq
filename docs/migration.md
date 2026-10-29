# Standalone migration

Canonical repository: https://github.com/splitintech/slack-agent-hq

The product was extracted from `splitintech/open-internal-tools` commit `f5ec32bc4d050bfbd3f01ecc53569038eb9ce308`. Its folder is now the repository root. Relevant history, authors, tests, examples, assets and required shared release tooling were retained. Filtered commit IDs differ; [commit-map.txt](migration/commit-map.txt) maps original IDs to the rewritten history. Original signed tags remain in the hub; no rewritten tag claims the original signature.

[source-files.json](migration/source-files.json) records every selected upstream file, original Git mode and SHA-256. [snapshot.json](migration/snapshot.json) records the migrated versions and explains intentional changes. Runtime source is preserved except where explicitly recorded. Product license and existing artwork are retained.

Run `python3 scripts/check-migration.py --snapshot` for exact migration integrity; run without `--snapshot` after subsequent development to validate inventory and retained assets. The extraction does not publish npm packages, install services, provision infrastructure or qualify live provider integrations. Existing consumers retain their package/API identities.

The old folder becomes a migration notice only after remote source and standalone checks are verified. Restore a previous consumer artifact or use the pinned hub revision for rollback. New development belongs in this repository.

Standalone checks exposed existing Slack SDK type mismatches: optional thread payloads now use valid channel/thread shapes, and the budget test includes its required run ID. The workspace requires Node 22.13+ for its existing node:sqlite runtime. These changes preserve the private workspace package names and do not configure or contact Slack.
