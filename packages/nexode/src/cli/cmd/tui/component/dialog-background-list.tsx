import { DialogSelect, type DialogSelectRef } from "../ui/dialog-select"
import { useDialog } from "../ui/dialog"
import { createResource, onCleanup } from "solid-js"
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { spawn } from "bun"
import { useToast } from "../ui/toast"

export function DialogBackgroundList() {
    const dialog = useDialog()
    const toast = useToast()
    let ref: DialogSelectRef<string>

    const [images] = createResource(async () => {
        const dir = "/home/groot/Nexode_light"
        try {
            const files = await readdir(dir)
            return files
                .filter((file) => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".webp"))
                .map((file) => ({
                    title: file,
                    value: join(dir, file),
                }))
        } catch {
            return []
        }
    })

    function setBackground(imagePath: string) {
        if (!imagePath) return
        try { spawn(["termux-background", "--image", imagePath]).unref() } catch (e) { }
        try { spawn(["feh", "--bg-scale", imagePath]).unref() } catch (e) { }
        try { spawn(["xfconf-query", "-c", "xfce4-desktop", "-p", "/backdrop/screen0/monitor0/workspace0/last-image", "-s", imagePath]).unref() } catch (e) { }
    }

    return (
        <DialogSelect
            title="Background Images"
            options={images() ?? []}
            onSelect={(opt) => {
                setBackground(opt.value)
                toast.show({
                    title: "Background",
                    message: `Set background to ${opt.title}`,
                    variant: "info",
                    duration: 3000
                })
                dialog.clear()
            }}
            ref={(r) => {
                ref = r
            }}
        />
    )
}
