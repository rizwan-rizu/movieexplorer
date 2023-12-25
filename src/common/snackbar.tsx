interface iAlertProps {
  message: string
  onClose: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

const Snackbar = (props: iAlertProps) => {
  return (
    <div id="toast-bottom-left" className="fixed flex items-center justify-between w-full max-w-xs p-4 text-white bg-black rounded-lg shadow bottom-5 right-5" role="alert">
      <div className="text-sm font-normal">{props.message}</div>
      <button className="text-white" onClick={() => props.onClose && props.onClose(false)}>X</button>
    </div>
  )
}

export default Snackbar