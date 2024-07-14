'use client'

import { editHackathonConfig } from '@/app/firebase/functions'
import useAdmin from '@/app/hooks/useAdmin'
import { DurationInDaysInterface } from '@/app/types/HackathonInterface'
import { Card } from '@/components/ui/card'
import { toastError } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Loader } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Duration from './Duration'
import StartDay from './StartDay'
import StartHour from './StartHour'

function HackathonConfig() {
    const { hackathonConfig } = useAdmin({ getConfig: true })

    const [autoGenerateTheme, setAutoGenerateTheme] = useState(true)
    const [startDay, setStartDay] = useState(5)
    const [startHour, setStartHour] = useState(5)
    const [duration, setDuration] = useState<DurationInDaysInterface>({
        recognition: 1,
        submission: 3,
        voting: 3,
    })

    const [isConfigSaving, setIsConfigSaving] = useState(false)

    useEffect(() => {
        setAutoGenerateTheme(!!hackathonConfig?.autoGenerateTheme)
        setStartDay(hackathonConfig?.startDay ?? 5)
        setStartHour(hackathonConfig?.startHour ?? 5)

        if (hackathonConfig?.durationInDays) {
            setDuration(hackathonConfig.durationInDays)
        }
    }, [hackathonConfig])

    async function handleConfig() {
        try {
            setIsConfigSaving(true)

            await editHackathonConfig({
                durationInDays: duration,
                startDay,
                startHour,
                autoGenerateTheme,
            })

            toast.success('Successfully changed config.')
        } catch (error) {
            toastError(error)
        } finally {
            setIsConfigSaving(false)
        }
    }

    return (
        <Card className="w-fit space-y-6 px-10 py-8">
            <h2 className="text-2xl font-extrabold">
                Automatic Hackathon Config
            </h2>
            <section className="flex items-center gap-3">
                <Switch
                    checked={autoGenerateTheme}
                    onCheckedChange={(checked) => setAutoGenerateTheme(checked)}
                />
                <p className="text-sm text-gray-400">
                    Automatic generation is{' '}
                    {autoGenerateTheme ? 'active' : 'inactive'}
                </p>
            </section>
            <StartDay startDay={startDay} setStartDay={setStartDay} />
            <StartHour startHour={startHour} setStartHour={setStartHour} />
            <Duration durationInDays={duration} setDuration={setDuration} />
            <Button onClick={handleConfig} disabled={isConfigSaving}>
                {isConfigSaving ? (
                    <Loader className="animate-spin" />
                ) : (
                    'Save changes'
                )}
            </Button>
        </Card>
    )
}

export default HackathonConfig
