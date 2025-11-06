import { Button } from "@/components/ui/button"

export default function SubmitButton(props:{text:string}){
    return (
        <Button type="submit" className="bg-black text-white font-thin">{props.text}</Button>
    );
}