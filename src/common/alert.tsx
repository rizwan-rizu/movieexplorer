interface iAlertProps {
  color: "blue" | "red" | "green",
  message: string
}

const Alert = (props: iAlertProps) => {
  return (
    <div className={`p-4 mb-4 text-sm text-${props.color}-800 rounded-lg bg-${props.color}-100`} role="alert">
      <span className="font-medium">{props.message}</span>
    </div>
  )
}

export default Alert