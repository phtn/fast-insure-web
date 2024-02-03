type HeaderProps = {
  title: string
  description: string
}
export const Header = ({ title, description }: HeaderProps) => (
  <div className="flex items-center justify-between">
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  </div>
)
