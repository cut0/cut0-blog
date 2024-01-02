//eslint-disable-next-line no-undef
module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { breaking: true, release: "major" },
          { revert: true, release: "patch" },
          { type: "feat", release: "minor" },
          { type: "update", release: "minor" },
          { type: "disable", release: "minor" },
          { type: "!(release)", release: "patch" },
        ],
        parserOpts: {
          revertPattern: /^Revert\s"([\s\S]*)"$/m,
          revertCorrespondence: ["header"],
        },
      },
    ],
    [
      "@semantic-release/exec",
      {
        successCmd:
          "docker buildx build -t ${process.env.IMAGE}:${nextRelease.version} --push ../../",
      },
    ],
    [
      "@semantic-release/github",
      {
        successComment: false,
        failTitle: false,
      },
    ],
  ],
};
