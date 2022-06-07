const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueId = this.argv.issue || this.config.issue || null
    const { comment } = this.argv

    if ( !issueId ) {
        console.log(`No issue id found. Skipping...`)
        return {}
    }

    console.log(`Adding comment to ${issueId}: \n${comment}`)
    await this.Jira.addComment(issueId, { body: comment })

    return {}
  }
}
