import { HTMLProps } from "react"
import Header from "./header"
import Footer from "./footer"

interface iTemplateProps {
  body: JSX.Element
}

const Template = (props: iTemplateProps) => {
  return (
    <div className="bg-gray-100 relative">
      <Header />
      <div className="px-7 pb-3">
        {props.body}
      </div>
      <Footer />
    </div>
  )
}

export default Template