shtml2html
shtml2html -w "D:\GIT\librajt@github"

shtml2html -s 0_relative_include.shtml
shtml2html -s 0_relative_include.shtml -d aa
shtml2html -s 0_relative_include.shtml -d aa.shtml

shtml2html -s 1_not_exist_include.shtml
shtml2html -s 2_absolute_include.shtml -w "D:\GIT\librajt@github" 
shtml2html -s 3_virtual_include.shtml -w "D:\GIT\librajt@github" 
