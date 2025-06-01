'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Heart, Trophy, Music, Palette, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sports, Culture & Arts
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Empowering youth through sports, preserving culture, and nurturing artistic expression since 2002
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20" asChild>
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Background</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-6">
            <p>
              The sports, culture, and arts program was launched at Vision Jeunesse Nouvelle in 2002, 
              following Rwanda's recovery from the 1994 Genocide against the Tutsis. During this period, 
              many young people were struggling, feeling lost, hopeless and resorted to drug use, poverty, 
              and risky behaviors that led to sexual promiscuity.
            </p>
            <p>
              Our program background centers on several core pillars that define our mission and impact, 
              focusing on youth empowerment, cultural preservation, and community development.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Youth Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nurturing confidence, leadership skills, and identity through sports, culture, and art.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Cultural Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Preserving and promoting Rwandan cultural heritage through diverse artistic expressions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Education & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Imparting essential life skills through structured programs and workshops.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="w-12 h-12 text-red-600 mb-4" />
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fostering social cohesion through cultural events and outreach initiatives.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Trophy className="w-12 h-12 text-yellow-600 mb-4" />
                <CardTitle>General Objective</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Establishing a platform for discovering, nurturing, promoting, and developing the 
                  talents of young people with the aim of making them professionals, while also 
                  focusing on their values and behavior.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Music className="w-12 h-12 text-pink-600 mb-4" />
                <CardTitle>Specific Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Promoting sports in VJN operational areas</li>
                  <li>Developing and preserving youth talents</li>
                  <li>Delivering health and well-being messages</li>
                  <li>Increasing VJN's visibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of our vibrant initiative that brings together individuals from diverse backgrounds 
            to participate in sports, music, dance, and art.
          </p>
          <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20" asChild>
            <Link href="/contact">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 