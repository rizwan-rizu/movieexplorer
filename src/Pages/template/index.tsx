import { HTMLProps } from "react"
import Header from "./header"
import Footer from "./footer"

interface iTemplateProps {
  body: JSX.Element
}

const Template = (props: iTemplateProps) => {
  return (
    <div className="bg-gray-100 px-7 py-3 h-full">
      <Header />
      {props.body}
      <Footer />
    </div>
  )
}

export default Template