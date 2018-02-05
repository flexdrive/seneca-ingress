function ingress() {
  const seneca = this

  seneca.depends('balance-client')

  seneca.sub('role:transport,type:balance,add:client', function(msg) {
    const ingressConfig = msg.config.nodeMetadata
      ? msg.config.nodeMetadata.ingress
      : null
    if (ingressConfig) {
      this.act('role:ingress,cmd:add', { ingress: ingressConfig })
    }
  })
}

module.exports = ingress
