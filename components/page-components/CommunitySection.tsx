import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageCircle, Star } from "lucide-react";
import { communityFeatures, communityPosts } from "@/constants";

const CommunitySection = () => {
  return (
    <section id="community" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-balance">
              Join a supportive fitness community
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Share your progress, get motivated by others, and build lasting
              connections with people who share your fitness goals.
            </p>
            <div className="space-y-4">
              {communityFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-6">
              Join Community
              <Users className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="space-y-4">
            {communityPosts.map((post, i) => (
              <Card key={i} className="p-4">
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full" />
                    <div>
                      <div className="font-semibold">{post.user}</div>
                      <div className="text-sm text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Star className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                      <MessageCircle className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
