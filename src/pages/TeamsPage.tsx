import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Player, Sport, Team } from '@/lib/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface PlayerCardProps {
  player: Player;
  showDetails?: boolean;
}

const PlayerCard = ({ player, showDetails = false }: PlayerCardProps) => {
  const initials = `${player.first_name[0]}${player.family_name[0]}`;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={player.profile_picture_url || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {player.first_name} {player.family_name}
            </CardTitle>
            {player.jersey_number && (
              <CardDescription>Jersey #{player.jersey_number}</CardDescription>
            )}
            {player.position && (
              <CardDescription>{player.position}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      {showDetails && (
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <strong>Date of Birth:</strong>
              <p>{format(new Date(player.date_of_birth), 'PP')}</p>
            </div>
            <div>
              <strong>Age Level:</strong>
              <p>{player.age_level}</p>
            </div>
            <div>
              <strong>Registration:</strong>
              <p>{player.nature_of_registration}</p>
            </div>
            {player.source_club && (
              <div>
                <strong>Previous Club:</strong>
                <p>{player.source_club}</p>
              </div>
            )}
            <div>
              <strong>MA ID:</strong>
              <p>{player.ma_id}</p>
            </div>
            <div>
              <strong>FIFA ID:</strong>
              <p>{player.fifa_id}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const PlayerDialog = ({ player }: { player: Player }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Player Details</DialogTitle>
          <DialogDescription>
            Full information about {player.first_name} {player.family_name}
          </DialogDescription>
        </DialogHeader>
        <PlayerCard player={player} showDetails />
      </DialogContent>
    </Dialog>
  );
};

const TeamSection = ({ sport }: { sport: Sport }) => {
  const { data: players, isLoading } = useQuery({
    queryKey: ['players', sport],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('sport', sport)
        .order('family_name');
        
      if (error) throw error;
      return data as Player[];
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!players?.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p>No players found for this team.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map((player) => (
        <div key={player.id}>
          <PlayerCard player={player} />
          <PlayerDialog player={player} />
        </div>
      ))}
    </div>
  );
};

export default function TeamsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Teams</h1>
      
      <Tabs defaultValue="football">
        <TabsList className="mb-8">
          <TabsTrigger value="football">Football</TabsTrigger>
          <TabsTrigger value="handball">Handball</TabsTrigger>
          <TabsTrigger value="swimming">Swimming</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-[calc(100vh-250px)]">
          <TabsContent value="football">
            <TeamSection sport="football" />
          </TabsContent>
          
          <TabsContent value="handball">
            <TeamSection sport="handball" />
          </TabsContent>
          
          <TabsContent value="swimming">
            <TeamSection sport="swimming" />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
} 