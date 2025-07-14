import type { ReactNode } from 'react'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={clsx('bg-white rounded-lg shadow-lg p-6 w-full', sizeMap[size])}>
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
