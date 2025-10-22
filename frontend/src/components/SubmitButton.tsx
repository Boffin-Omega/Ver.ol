import { Button } from "@/components/ui/button"

export default function SubmitButton(props){
    return (
        <Button type="submit" className="bg-black text-white font-thin">{props.text}</Button>
    );
}