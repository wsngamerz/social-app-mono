import {Input} from "@ui/components/ui/input";
import {Textarea} from "@ui/components/ui/textarea";
import {Button} from "@ui/components/ui/button";
import {Label} from "@ui/components/ui/label";

export function ProfileForm() {

    return (
        <>
            <form className="space-y-8 max-w-md">
                <div className="space-y-2">
                    <Label>Username</Label>
                    <Input placeholder="shadcn" disabled/>
                    <p className="text-sm text-muted-foreground">
                        This is your username, this is what is to be used if you are tagged in anything. If you wish to
                        change it, please contact support.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input placeholder="Example" disabled/>
                    <p className="text-sm text-muted-foreground">
                        This is your public display name. It can be your real name or a
                        pseudonym.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none" disabled/>
                    <p className="text-sm text-muted-foreground">
                        You can <span>@mention</span> other users and organizations to
                        link to them.
                    </p>
                </div>


                <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <Input
                        placeholder="http://example.com/image.png"
                        disabled/>
                    <p className="text-sm text-muted-foreground">
                        This is the image that represents you across the site.
                    </p>
                </div>

                <Button type="submit">Update profile</Button>
            </form>
        </>
    )
}