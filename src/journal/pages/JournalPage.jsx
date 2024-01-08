import { Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"



export const JournalPage = () => {
  return (
    <JournalLayout>
    {/* <Typography> Ut deserunt sint ut aliquip ad nostrud eu tempor dolor adipisicing sint do mollit.</Typography> */}
      {/* <NothingSelectedView/> */}
    <NoteView/>
    </JournalLayout>
  )
}
