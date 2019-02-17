import Link from 'next/link'
export default () => (
  <div className="container">
    <div className="jumbotron text-center">
      <h2>seans nextjs, graphql, aws, apigateway, lambda, dynamodb boilerplate</h2>
      <p>Boilerplate for NextJS, which uses ReactJS and NodeJS, sending GraphQL to an AWS Api Getway, which fronts an AWS Lambda, which Fronts an AWS DynamodDB.</p>
    </div>
    <p>Nothing to see here, go and see {<Link href='/cats'><a>Cats</a></Link>} instead.</p>
  </div>
)
