import React from 'react'
import Loading from './loading'

export default function Button (props) {
  const variants = {
    primary:
      'bg-blue-100 text-blue-900 hover:bg-blue-200 active:bg-blue-300 border-blue-400',
    success:
      'bg-green-200 text-green-900 hover:bg-green-300 active:bg-green-400 border-green-400',
    error:
      'bg-red-200 text-red-900 hover:bg-red-300 active:bg-red-400 border-red-400',
    loading: 'bg-gray-300 text-gray-600',
    muted: 'bg-white text-gray-600'
  }
  const currentVariant =
    !props.loading && props.variant ? variants[props.variant] : variants.loading
  const btnClasses = `relative px-4 py-2 font-medium transition-colors duration-200 focus:outline-none disabled:cursor-default flex justify-center items-center ${
    props.className
  } ${props.inlineForm ? 'rounded-r' : 'rounded'} ${props.disabled &&
    'cursor-default'} ${currentVariant}`
  return (
    <button
      onClick={props.onClick}
      className={btnClasses}
      disabled={props.disabled}
      title={props.title}
      aria-label={props.title}
    >
      <div
        className='flex items-center'
        style={{
          opacity: props.loading || props.confirmed ? 0 : 1,
          transition: 'opacity 200ms'
        }}
      >
        {props.children}
      </div>
      <div className='absolute inset-x-0 inset-y-0 flex items-center justify-center'>
        {props.loading && <Loading />}
        {props.confirmed && (
          <svg
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='3px'
            fill='none'
            className='w-6'
          >
            <path d='M5 13l4 4L19 7' />
          </svg>
        )}
      </div>
    </button>
  )
}
