const Redis = require('ioredis')

class RedisStore {
  constructor(config = {}) {
    if (Array.isArray(config.nodes)) {
      this.client = new Redis.Cluster(config.nodes, config.options)
    } else {
      this.client = new Redis(config)
    }
    this.serialize = JSON.stringify
    this.unserialize = JSON.parse
  }

  async get(sid) {
    const data = await this.client.get(sid)
    if (!data) {
      return null
    }
    try {
      return this.unserialize(data.toString())
    } catch (err) {}
  }

  async set(sid, sess, ttl) {
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    sess = this.serialize(sess)
    if (ttl) {
      await this.client.set(sid, sess, 'EX', ttl)
    } else {
      await this.client.set(sid, sess)
    }
  }

  async destroy(sid) {
    await this.client.del(sid)
  }

  async quit() {
    await this.client.quit()
  }

  async end() {
    await this.client.quit()
  }
}

module.exports = RedisStore
