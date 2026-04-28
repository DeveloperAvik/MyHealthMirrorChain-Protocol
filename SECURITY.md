# Security Policy

MyHealthMirrorChain Protocol is security-critical infrastructure for healthcare data integrity.
This document explains how to report vulnerabilities, what to include in reports, and how we handle coordinated disclosure.

## Supported Versions

Security fixes are prioritized for the actively developed default branch.

| Version | Supported |
| --- | --- |
| `main` (latest) | Yes |
| Older commits/tags | Best effort |

## Reporting a Vulnerability

Please do not open public issues for security vulnerabilities.

Use one of these private channels:

1. GitHub Security Advisories (preferred): open a private vulnerability report in this repository.
2. If Advisories are unavailable, contact the maintainers through the repository owner profile:
	https://github.com/DeveloperAvik

When reporting, include:

1. A clear description of the issue and impacted component(s)
2. Reproduction steps or proof of concept
3. Expected vs actual behavior
4. Impact assessment (confidentiality, integrity, availability)
5. Suggested mitigation (if available)
6. Environment details (OS, runtime, package versions, commit hash)

## Response Timeline

Target response times:

1. Acknowledgement: within 72 hours
2. Triage decision: within 7 days
3. Fix plan or mitigation guidance: within 14 days for confirmed high/critical issues

Complex issues may take longer. We will provide status updates during investigation.

## Disclosure Process

We follow coordinated disclosure:

1. Report is received privately and validated
2. Severity is assessed and impacted versions are identified
3. Patch or mitigation is prepared and tested
4. Release notes and advisory are published
5. Credit is given to reporters unless anonymity is requested

Please allow time for a fix before public disclosure.

## Scope

In scope:

1. `packages/core` blockchain consensus, validation, and chain state logic
2. `packages/cryptography` encryption, hashing, signature, and key-management modules
3. `packages/api` authentication, authorization, validation, and request handling
4. `packages/storage` data integrity, encryption-at-rest pipeline, and off-chain access controls
5. Infrastructure-as-code in `infra` where misconfiguration causes exploitable risk

Out of scope (unless there is clear security impact):

1. Documentation typos and formatting issues
2. Purely theoretical attacks without a realistic exploit path
3. Issues requiring physical device compromise outside project control
4. Denial-of-service claims without reproducible evidence

## Safe Harbor

We support good-faith security research.

If you:

1. Avoid privacy violations and service disruption
2. Only test against systems you are authorized to test
3. Report findings promptly and privately
4. Do not exfiltrate, modify, or retain sensitive data

we will treat your research as authorized and work with you in good faith.

## Healthcare Data and Privacy Expectations

This project is under active development and is not production-ready for real medical data.

If you discover exposed data:

1. Do not copy, share, or store the data beyond what is minimally required for reporting
2. Immediately report the issue through a private channel
3. Include only redacted evidence in your report

Security design goals include:

1. Encrypting sensitive medical data before storage
2. Storing hashes on-chain rather than raw records
3. Supporting auditability with patient privacy considerations

## Security Best Practices for Contributors

Before submitting code:

1. Validate inputs and fail securely
2. Avoid logging secrets, keys, PHI, or sensitive payloads
3. Use strong, vetted cryptography and avoid custom crypto primitives
4. Keep dependencies updated and remove unused packages
5. Add tests for security-sensitive paths (auth, validation, cryptographic verification)

## Incident Handling

For confirmed incidents, maintainers may:

1. Temporarily disable vulnerable features
2. Ship emergency patches
3. Publish mitigation guidance and upgrade paths
4. Notify users through repository advisories and release notes

## Acknowledgements

We appreciate responsible disclosure and collaboration from the security community.
