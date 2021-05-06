import * as React from 'react'

const AboutPage = () => {
  React.useEffect(() => {
    console.log('On the About page')
  }, [])

  return (
    <React.Fragment>
      <p>
        This site was created to demonstrate my mastery of Redwood: Look on my
        works, ye mighty, and despair!
      </p>
    </React.Fragment>
  )
}

export default AboutPage
