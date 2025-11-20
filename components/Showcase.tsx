import React from 'react';
import { Button } from './ui/Button';
import { Input, TextArea } from './ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/Card';
import { Text } from './ui/Typography';
import { Terminal } from './ui/Terminal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { useToast } from './ui/Toast';
import { cn } from '../utils';

export const Showcase: React.FC = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-20 pb-32 animate-slide-up">
      
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden rounded-3xl bg-surface-900/30 border border-surface-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-surface-900/10 pointer-events-none" />
        <div className="relative z-10 px-6 lg:px-12 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-800/50 border border-surface-700 text-xs font-medium text-primary-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            v2.0 Design System
          </div>
          <Text as="h1" variant="h1" weight="bold" className="text-transparent bg-clip-text bg-gradient-to-b from-white to-surface-400 sm:text-6xl">
            The Nexus Design System
          </Text>
          <Text variant="h4" color="muted" className="leading-relaxed">
            A collection of high-performance, accessible, and composable React components 
            crafted for building modern AI-driven interfaces.
          </Text>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" rightIcon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}>
              Explore Components
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open('https://github.com', '_blank')}>
              View Source
            </Button>
          </div>
        </div>
      </section>

      {/* Foundation: Colors & Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Colors */}
        <section className="space-y-6">
           <div className="flex items-center justify-between border-b border-surface-800 pb-4">
              <Text variant="h3" weight="semibold">Color Palette</Text>
              <span className="text-xs font-mono text-surface-500">theme.colors</span>
           </div>
           <div className="space-y-4">
              <div className="space-y-2">
                <Text variant="caption" color="muted">Primary</Text>
                <div className="grid grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => (
                    <div key={step} className="space-y-1 group cursor-pointer">
                      <div className={`h-10 w-full rounded-md bg-primary-${step} ring-2 ring-transparent group-hover:ring-white/20 transition-all`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Text variant="caption" color="muted">Surface</Text>
                <div className="grid grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => (
                    <div key={step} className="space-y-1 group cursor-pointer">
                      <div className={`h-10 w-full rounded-md bg-surface-${step} ring-2 ring-transparent group-hover:ring-white/20 transition-all`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-900 border border-surface-800 space-y-2">
                   <div className="w-8 h-8 rounded bg-red-500" />
                   <Text variant="caption">Destructive</Text>
                </div>
                <div className="p-4 rounded-xl bg-surface-900 border border-surface-800 space-y-2">
                   <div className="w-8 h-8 rounded bg-indigo-400" />
                   <Text variant="caption">Accent</Text>
                </div>
                <div className="p-4 rounded-xl bg-surface-900 border border-surface-800 space-y-2">
                   <div className="w-8 h-8 rounded bg-green-400" />
                   <Text variant="caption">Success</Text>
                </div>
              </div>
           </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-surface-800 pb-4">
              <Text variant="h3" weight="semibold">Typography</Text>
              <span className="text-xs font-mono text-surface-500">components/ui/Typography</span>
          </div>
          <div className="space-y-6 p-6 rounded-xl border border-surface-800 bg-surface-900/20">
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="text-xs text-surface-500 font-mono">H1 / 48px</span>
              <Text variant="h1" className="truncate">The quick brown fox</Text>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="text-xs text-surface-500 font-mono">H2 / 36px</span>
              <Text variant="h2" className="truncate">The quick brown fox</Text>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="text-xs text-surface-500 font-mono">H3 / 30px</span>
              <Text variant="h3" className="truncate">The quick brown fox</Text>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="text-xs text-surface-500 font-mono">Body / 16px</span>
              <Text variant="body" color="muted">The quick brown fox jumps over the lazy dog. It's a classic pangram used to demonstrate typefaces.</Text>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="text-xs text-surface-500 font-mono">Mono / 14px</span>
              <Text variant="mono" className="text-primary-400">const nexus = require('design-system');</Text>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive: Buttons */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-surface-800 pb-4">
           <Text variant="h3" weight="semibold">Actions & Controls</Text>
           <span className="text-xs font-mono text-surface-500">components/ui/Button</span>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
           <div className="space-y-6">
             <Text variant="h4" className="text-surface-300">Variants</Text>
             <div className="flex flex-wrap gap-4 p-6 rounded-xl bg-surface-900/40 border border-surface-800">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="glass">Glass</Button>
             </div>
           </div>

           <div className="space-y-6">
             <Text variant="h4" className="text-surface-300">States & Sizes</Text>
             <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl bg-surface-900/40 border border-surface-800">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <div className="w-px h-8 bg-surface-700 mx-2" />
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" leftIcon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}>
                   With Icon
                </Button>
             </div>
           </div>
        </div>
      </section>

      {/* Data Entry: Inputs */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-surface-800 pb-4">
           <Text variant="h3" weight="semibold">Data Entry</Text>
           <span className="text-xs font-mono text-surface-500">components/ui/Input</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="space-y-4">
             <CardHeader>
               <CardTitle>Authentication</CardTitle>
               <CardDescription>Standard form layout example.</CardDescription>
             </CardHeader>
             <div className="space-y-4">
                <Input label="Email" placeholder="name@example.com" icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                } />
                <Input label="Password" type="password" placeholder="••••••••" icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                } />
             </div>
             <CardFooter className="justify-end">
                <Button className="w-full sm:w-auto">Sign In</Button>
             </CardFooter>
          </Card>

          <Card className="space-y-4">
             <CardHeader>
               <CardTitle>Validation States</CardTitle>
               <CardDescription>Visual feedback for user input.</CardDescription>
             </CardHeader>
             <div className="space-y-4">
                <Input label="Username" placeholder="nexus_user" />
                <Input label="Website" error="Invalid URL format" placeholder="htps://..." defaultValue="htps://google.com" />
                <TextArea label="Bio" placeholder="Tell us about yourself..." className="h-[106px]" />
             </div>
          </Card>
        </div>
      </section>

      {/* Containers: Cards */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-surface-800 pb-4">
           <Text variant="h3" weight="semibold">Containers & Layout</Text>
           <span className="text-xs font-mono text-surface-500">components/ui/Card</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Standard Card */}
          <Card>
             <div className="aspect-video bg-surface-800/50 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <CardTitle>Standard Card</CardTitle>
             <CardDescription className="mt-2">The default surface elevation for most content.</CardDescription>
          </Card>

          {/* Gradient Card */}
          <Card variant="gradient" className="relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[40px] rounded-full pointer-events-none" />
             <CardHeader>
               <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Pro Plan</CardTitle>
                  <span className="px-2 py-1 rounded bg-primary-500/20 text-primary-300 text-xs font-bold uppercase">Popular</span>
               </div>
               <CardDescription className="text-surface-300">Unlock full potential</CardDescription>
             </CardHeader>
             <div className="py-4">
                <Text variant="h2" className="text-white">$29<span className="text-lg text-surface-400 font-normal">/mo</span></Text>
             </div>
             <CardFooter>
                <Button className="w-full bg-white text-surface-950 hover:bg-surface-200">Subscribe</Button>
             </CardFooter>
          </Card>

          {/* Glass Card */}
          <Card variant="glass" className="relative">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
             <CardHeader>
                <CardTitle>Glassmorphism</CardTitle>
                <CardDescription>Blur effects for overlays.</CardDescription>
             </CardHeader>
             <div className="space-y-2 py-2">
                <div className="h-2 w-3/4 bg-white/10 rounded" />
                <div className="h-2 w-1/2 bg-white/10 rounded" />
                <div className="h-2 w-5/6 bg-white/10 rounded" />
             </div>
             <CardFooter>
                <Button variant="glass" size="sm" className="w-full">Action</Button>
             </CardFooter>
          </Card>
        </div>
      </section>

      {/* Advanced Components */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-surface-800 pb-4">
           <Text variant="h3" weight="semibold">Advanced Components</Text>
           <span className="text-xs font-mono text-surface-500">Tabs, Terminal, Toast</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           
           {/* Tabs & Terminal */}
           <div className="space-y-6">
              <Card padding="sm" className="h-full flex flex-col">
                 <Tabs defaultValue="terminal" className="w-full h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4 px-2">
                       <Text weight="medium">Developer Tools</Text>
                       <TabsList>
                          <TabsTrigger value="terminal">Terminal</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                       </TabsList>
                    </div>
                    <TabsContent value="terminal" className="flex-1 mt-0">
                       <Terminal title="bash" className="h-[250px]">
                          <div className="text-green-400">➜  ~  git clone https://github.com/nexus-ui/kit.git</div>
                          <div className="text-surface-300">Cloning into 'kit'...</div>
                          <div className="text-surface-300">remote: Enumerating objects: 142, done.</div>
                          <div className="text-surface-300">remote: Total 142 (delta 3), reused 0 (delta 0)</div>
                          <div className="text-surface-300">Receiving objects: 100% (142/142), 2.45 MiB | 3.20 MiB/s, done.</div>
                          <div className="text-green-400 mt-2">➜  kit git:(main) <span className="animate-pulse">_</span></div>
                       </Terminal>
                    </TabsContent>
                    <TabsContent value="preview" className="flex-1 mt-0 h-[250px] flex items-center justify-center bg-surface-900/50 rounded-lg border border-surface-800 border-dashed">
                        <Text color="muted">Component Preview Area</Text>
                    </TabsContent>
                 </Tabs>
              </Card>
           </div>

           {/* Toasts Playground */}
           <div className="space-y-6">
              <Card className="h-full">
                 <CardHeader>
                    <CardTitle>Notification System</CardTitle>
                    <CardDescription>Non-blocking feedback toasts.</CardDescription>
                 </CardHeader>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                        variant="outline" 
                        className="border-green-500/20 hover:bg-green-500/10 hover:border-green-500/50 text-green-400 justify-start"
                        onClick={() => addToast('success', 'Deployment Successful', 'Your app is now live on the edge.')}
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2" /> Success
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50 text-red-400 justify-start"
                        onClick={() => addToast('error', 'Compilation Failed', 'Check line 42 for syntax errors.')}
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2" /> Error
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/50 text-blue-400 justify-start"
                        onClick={() => addToast('info', 'Update Available', 'Version 2.1.0 has been released.')}
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" /> Info
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-yellow-500/20 hover:bg-yellow-500/10 hover:border-yellow-500/50 text-yellow-400 justify-start"
                        onClick={() => addToast('warning', 'High Memory Usage', 'Process is consuming 80% RAM.')}
                    >
                        <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2" /> Warning
                    </Button>
                 </div>
                 <div className="mt-6 p-4 rounded-lg bg-surface-900/50 border border-surface-800/50">
                    <Text variant="mono" className="text-xs text-surface-500">
                        addToast('success', 'Message', 'Description')
                    </Text>
                 </div>
              </Card>
           </div>

        </div>
      </section>

    </div>
  );
};