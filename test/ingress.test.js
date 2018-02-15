const Assert = require('assert')

const Lab = require('lab')
const Code = require('code')
const Seneca = require('seneca')

const lab = (exports.lab = Lab.script())
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const test_discover = {
  stop: true,
  guess: { active: true },
  multicast: { active: false },
  registry: { active: false }
}

describe('mesh ingress', function() {
  it(
    'accepts ingress configuration',
    { parallel: false, timeout: 5555 },
    function(fin) {
      const b0 = Seneca({ tag: 'b0', legacy: { transport: false } })
        .test(fin)
        .use('seneca-mesh', { base: true, discover: test_discover })
        .use('../ingress')
        .add('role:ingress,cmd:add', function(msg) {
          s0.close(b0.close.bind(b0, setTimeout.bind(this, fin, 555)))
        })

      const s0 = Seneca({ tag: 's0', legacy: { transport: false } })
        .test(fin)
        .add('a:1', function(msg, reply) {
          reply({ x: msg.x })
        })

      b0.ready(function() {
        s0.use('seneca-mesh', {
          pin: 'a:1',
          discover: test_discover,
          nodeMetadata: {
            ingress: {
              routes: [
                {
                  path: '/test',
                  method: 'POST',
                  pattern: 'cmd:test,val:{query.val1}'
                }
              ]
            }
          }
        })
      })

      function onAddClient(meta) {
        const routes = meta.config.routes
        Assert.equal(routes.length, 1)
        s0.close(b0.close.bind(b0, setTimeout.bind(this, fin, 555)))
      }
    }
  )
})
