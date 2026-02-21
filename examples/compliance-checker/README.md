# Compliance Checker Agent

A regulatory compliance reviewer that checks marketing content before publication.

## What it does

- Reviews content line by line against compliance rules
- Flags medical claims, unsubstantiated statistics, guaranteed results
- Checks brand voice alignment
- Returns structured JSON with issues, severity levels, and suggested fixes

## Inputs

| Input | Required | Description |
|---|---|---|
| `content_to_review` | Yes | The marketing content to check |
| `compliance_rules` | No | Industry-specific regulations |
| `brand_guidelines` | No | Brand voice and approved messaging |

## Tools needed

None — this agent works purely with text analysis.

## Guardrails

This agent operates in `human-approval` mode — every review must be confirmed by a human before the content status changes.

See `guardrails.yaml` for the complete rule set.
