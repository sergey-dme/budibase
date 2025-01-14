const { setTenantId } = require("../tenancy")
const ContextFactory = require("../tenancy/FunctionContext")
const { buildMatcherRegex, matches } = require("./matchers")

module.exports = (allowQueryStringPatterns, noTenancyPatterns) => {
  const allowQsOptions = buildMatcherRegex(allowQueryStringPatterns)
  const noTenancyOptions = buildMatcherRegex(noTenancyPatterns)

  return ContextFactory.getMiddleware(ctx => {
    const allowNoTenant = !!matches(ctx, noTenancyOptions)
    const allowQs = !!matches(ctx, allowQsOptions)
    setTenantId(ctx, { allowQs, allowNoTenant })
  })
}
