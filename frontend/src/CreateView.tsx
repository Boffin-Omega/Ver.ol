import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import SubmitButton from "@/components/SubmitButton.tsx"

export default function CreateView(){
    return (
        //should be a form here to create a repo
        <div className="CreateView">
            <div className="font-bold text-4xl mb-10">Create a repository</div>
            <form>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="repoName">Repository Name</FieldLabel>
                        <Input id="repoName" autoComplete="off" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="repoDesc">Add description</FieldLabel>
                        <Textarea id="repoDesc" placeholder="Add repo description"/>
                    </Field>

                    <Field orientation="horizontal">
                        <SubmitButton text={"Create repository"} />
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}