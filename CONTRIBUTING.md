# Contributing to .fylle

Thank you for your interest in contributing to the .fylle format!

## How to contribute

### Reporting issues

- Use [GitHub Issues](https://github.com/DavideScanta/fylle-format/issues) for bugs and feature requests
- For spec questions or discussions, use [GitHub Discussions](https://github.com/DavideScanta/fylle-format/discussions)

### Proposing spec changes

The format specification is in `spec/SPECIFICATION.md`. To propose changes:

1. Open an issue describing the change and its motivation
2. Wait for discussion and consensus
3. Submit a PR with the spec change + any SDK updates needed

### Contributing code

1. Fork the repository
2. Create a branch for your change
3. Write tests for new functionality
4. Submit a PR with a clear description

### Python SDK

```bash
cd sdk/python
pip install -e ".[dev]"
pytest
```

### CLI

```bash
cd cli
npm install
npm run dev -- validate path/to/agent
```

## Code of conduct

Be kind, be constructive, be inclusive.

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.
