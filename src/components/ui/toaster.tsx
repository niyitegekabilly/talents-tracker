
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useState, useEffect } from "react"

export function Toaster() {
  const { toasts, subscribe } = useToast()
  const [toastList, setToastList] = useState(toasts || [])
  
  useEffect(() => {
    return subscribe((state) => {
      setToastList(state.toasts)
    })
  }, [subscribe])

  // Map our custom variants to the ones accepted by the Toast component
  const mapVariant = (variant: string | undefined): "default" | "destructive" => {
    if (variant === "destructive") {
      return "destructive"
    }
    return "default" // Map both success and default to default
  }

  return (
    <ToastProvider>
      {toastList.map(function ({ id, title, description, action, variant, ...props }) {
        // Filter out any invalid props that shouldn't be passed to Toast
        const { open, ...otherProps } = props;
        
        return (
          <Toast key={id} variant={mapVariant(variant)} open={open} {...otherProps}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
