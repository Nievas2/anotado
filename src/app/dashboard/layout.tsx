const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex flex-1 w-full">
      <title>Anotado | Editor</title>
      {children}
    </div>
  )
}
export default layout