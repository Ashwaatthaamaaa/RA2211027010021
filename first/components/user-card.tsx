import Image from "next/image"
import { generateAvatarUrl } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserCardProps {
  userId: string
  name: string
  postCount: number
  rank: number
}

export default function UserCard({ userId, name, postCount, rank }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={generateAvatarUrl(userId) || "/placeholder.svg"}
                alt={name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <Badge
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold"
              variant={rank <= 3 ? "default" : "outline"}
            >
              {rank}
            </Badge>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {postCount} post{postCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

