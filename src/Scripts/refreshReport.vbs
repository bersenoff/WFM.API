set FSO = Wscript.CreateObject("Scripting.fileSystemObject")

FilePath = Wscript.Arguments(0)

set Excel = CreateObject("Excel.Application")

Excel.Visible = false
Excel.ScreenUpdating = false
Excel.DisplayAlerts = false
Excel.WorkBooks.Open(FilePath)

Wscript.Sleep 30000

set Report = Excel.WorkBooks(FSO.getFileName(FilePath))
Report.RefreshAll

Wscript.Sleep 200000

Report.Close true

Excel.Quit