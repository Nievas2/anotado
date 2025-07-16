const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="h-full w-full">
      <title>Anotado | Editor</title>
      {children}
    </div>
  )
}
export default layout