import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

function getMobileOperatingSystem() {
  if (typeof window !== `undefined`) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/android/i.test(userAgent)) {
      return "android"
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "ios"
    } else {
      return "unknown"
    }
  } else {
    return ""
  }
}
const getPlatformSpecificLink = urlObj => {
  const userAgent = getMobileOperatingSystem()

  switch (userAgent) {
    case "ios":
      return `https://www.ios.com`
    case "android":
      return `https://www.android.com`
    default:
      return `https://www.default.com`
  }
}

const useBrowserSpecificLink = (getterFunction, ssrValue) => {
  const [link, setLink] = React.useState(ssrValue)

  React.useLayoutEffect(() => setLink(getterFunction()), [getterFunction])

  return link
}

const useOnboardingLink = () => {
  return useBrowserSpecificLink(
    getPlatformSpecificLink,
    `https://www.default.com`
  )
}

const IndexPage = () => {
  const [link1, setLink1] = React.useState(getPlatformSpecificLink())
  const link2 = getPlatformSpecificLink()

  React.useLayoutEffect(() => setLink1(getPlatformSpecificLink()), [])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={link1}>{`link1    ${link1}`}</Link>
        <Link to={link2}>{`link2    ${link2}`}</Link>
        <Link
          to={getPlatformSpecificLink()}
        >{`link3    ${getPlatformSpecificLink()}`}</Link>
        <a href={useOnboardingLink()}>{`link4    ${useOnboardingLink()}`}</a>
      </div>
    </Layout>
  )
}

export default IndexPage
