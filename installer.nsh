!define MUI_FINISHPAGE_LINK "Donar con PayPal (Tarjeta/Saldo)"
!define MUI_FINISHPAGE_LINK_LOCATION "https://www.paypal.com/ncp/payment/YCEAHBRHCUGYS"

!define MUI_FINISHPAGE_SHOWREADME "https://paypal.me/edanielvalencia"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Donar con PayPal.me (Edaniel Valencia)"
!define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED

Var MyInstallButtonText

!macro customInit
  StrCpy $MyInstallButtonText "Instalar"
  
  ReadRegStr $0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "UninstallString"
  ${If} $0 != ""
    StrCpy $MyInstallButtonText "Reinstalar"
  ${EndIf}
  
  ReadRegStr $0 HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}" "UninstallString"
  ${If} $0 != ""
    StrCpy $MyInstallButtonText "Reinstalar"
  ${EndIf}
!macroend

!macro customHeader
  !define MUI_BUTTONTEXT_INSTALL "$MyInstallButtonText"
!macroend
