/*
OSN HAX Navigation
------------------
Add toolbar buttons and shortcut keys to navigate unread messages in OSN
*/
var NAV = {
    
    imgs: {
        blue_dot: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVR42mNgGAVYAWvR+QS2onM7WIvOfYXQ5xNI0gzU+AOI/yPhH0QbArX5PzoGiRPpgnNfsRkAEqeXCygMA4pjYRSQDgCkIV6RL/9K3AAAAABJRU5ErkJggg==",
        unread_map: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAGCAYAAAAlvnXZAAAAV0lEQVQY031QWw4AMARzTr2jHYfb2IcsE8RHQzxaRSzmLOY45pAAJ2y1B2JRD/yBGiPXJpRIukomfTnaTCKpBZy/jMESmpCGneqZJyvLf6hegeUvkLl/AZMDJRdoZ8PRAAAAAElFTkSuQmCC",
        folder_page: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAKBmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgIHhtbG5zOnBsdXNfMV89Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcFJpZ2h0czpNYXJrZWQ9IlRydWUiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMTEtMDEtMjVUMTM6NTU6MzYrMDE6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjM1NjRFNjc4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjM1NjRFNjc4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGMzU2NEU2NzgyMjhFMDExOTg5Q0MwQTFBRDAyQjVDMiI+CiAgIDx4bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPGRjOmNyZWF0b3I+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpPkdlbnRsZWZhY2UgY3VzdG9tIHRvb2xiYXIgaWNvbnMgZGVzaWduPC9yZGY6bGk+CiAgICA8L3JkZjpTZXE+CiAgIDwvZGM6Y3JlYXRvcj4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5XaXJlZnJhbWUgbW9ubyB0b29sYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6ZGVzY3JpcHRpb24+CiAgIDxkYzpzdWJqZWN0PgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaT5jdXN0b20gaWNvbiBkZXNpZ248L3JkZjpsaT4KICAgICA8cmRmOmxpPnRvb2xiYXIgaWNvbnM8L3JkZjpsaT4KICAgICA8cmRmOmxpPmN1c3RvbSBpY29uczwvcmRmOmxpPgogICAgIDxyZGY6bGk+aW50ZXJmYWNlIGRlc2lnbjwvcmRmOmxpPgogICAgIDxyZGY6bGk+dWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT5ndWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT50YXNrYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwvZGM6c3ViamVjdD4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxJcHRjNHhtcENvcmU6Q3JlYXRvckNvbnRhY3RJbmZvCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSJodHRwOi8vd3d3LmdlbnRsZWZhY2UuY29tIi8+CiAgIDxwbHVzXzFfOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpJbWFnZUNyZWF0b3JOYW1lPSJnZW50bGVmYWNlLmNvbSIvPgogICAgPC9yZGY6U2VxPgogICA8L3BsdXNfMV86SW1hZ2VDcmVhdG9yPgogICA8cGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpDb3B5cmlnaHRPd25lck5hbWU9ImdlbnRsZWZhY2UuY29tIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwvcGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RjM1NjRFNjc4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMDEtMjVUMTM6NTU6MzYrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+jXRk2wAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA8dEVYdEFMVFRhZwBUaGlzIGlzIHRoZSBpY29uIGZyb20gR2VudGxlZmFjZS5jb20gZnJlZSBpY29ucyBzZXQuINhr6MQAAABEdEVYdENvcHlyaWdodABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVze92woAAAAEVpVFh0RGVzY3JpcHRpb24AAAAAAFRoaXMgaXMgdGhlIGljb24gZnJvbSBHZW50bGVmYWNlLmNvbSBmcmVlIGljb25zIHNldC4gvBH4GgAAAEhpVFh0Q29weXJpZ2h0AAAAAABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVzWILLBQAAALxJREFUeNqsUssNwjAMdSRLufbSa5QR2ABGgI0YqSOkE5QN6CF3U6k9VE0THFQh4AJJeNKLrUi2nz8ADO99xwwvpHVdd/ALlmU5O+fCJ/m/Y1bf4sU8z8S2gjQ0UspTdJClpgbDW8FxHMM0TUfIxTAMBAVAnriJDhFpNtfkBDyDNjpsDxkCbhhCaLZb2GckMFjXdV+goMX4Wms1K9BZCjb5OWvslVIXLOn/sYWS/p8JWEHyOQshDPwDdwEGAJOne5zIgxkyAAAAAElFTkSuQmCC",
        email_open: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAKBmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgIHhtbG5zOnBsdXNfMV89Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcFJpZ2h0czpNYXJrZWQ9IlRydWUiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMTEtMDEtMjVUMTM6NTU6MzgrMDE6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTkzMzk1Njg4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTkzMzk1Njg4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5OTMzOTU2ODgyMjhFMDExOTg5Q0MwQTFBRDAyQjVDMiI+CiAgIDx4bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPGRjOmNyZWF0b3I+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpPkdlbnRsZWZhY2UgY3VzdG9tIHRvb2xiYXIgaWNvbnMgZGVzaWduPC9yZGY6bGk+CiAgICA8L3JkZjpTZXE+CiAgIDwvZGM6Y3JlYXRvcj4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5XaXJlZnJhbWUgbW9ubyB0b29sYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6ZGVzY3JpcHRpb24+CiAgIDxkYzpzdWJqZWN0PgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaT5jdXN0b20gaWNvbiBkZXNpZ248L3JkZjpsaT4KICAgICA8cmRmOmxpPnRvb2xiYXIgaWNvbnM8L3JkZjpsaT4KICAgICA8cmRmOmxpPmN1c3RvbSBpY29uczwvcmRmOmxpPgogICAgIDxyZGY6bGk+aW50ZXJmYWNlIGRlc2lnbjwvcmRmOmxpPgogICAgIDxyZGY6bGk+dWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT5ndWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT50YXNrYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwvZGM6c3ViamVjdD4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxJcHRjNHhtcENvcmU6Q3JlYXRvckNvbnRhY3RJbmZvCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSJodHRwOi8vd3d3LmdlbnRsZWZhY2UuY29tIi8+CiAgIDxwbHVzXzFfOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpJbWFnZUNyZWF0b3JOYW1lPSJnZW50bGVmYWNlLmNvbSIvPgogICAgPC9yZGY6U2VxPgogICA8L3BsdXNfMV86SW1hZ2VDcmVhdG9yPgogICA8cGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpDb3B5cmlnaHRPd25lck5hbWU9ImdlbnRsZWZhY2UuY29tIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwvcGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTkzMzk1Njg4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMDEtMjVUMTM6NTU6MzgrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+n/zh7QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA8dEVYdEFMVFRhZwBUaGlzIGlzIHRoZSBpY29uIGZyb20gR2VudGxlZmFjZS5jb20gZnJlZSBpY29ucyBzZXQuINhr6MQAAABEdEVYdENvcHlyaWdodABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVze92woAAAAEVpVFh0RGVzY3JpcHRpb24AAAAAAFRoaXMgaXMgdGhlIGljb24gZnJvbSBHZW50bGVmYWNlLmNvbSBmcmVlIGljb25zIHNldC4gvBH4GgAAAEhpVFh0Q29weXJpZ2h0AAAAAABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVzWILLBQAAAU5JREFUeNqsU91tgzAQDlFfeDNCSDwxQ7JBR0g2IBNUnaTtBGSDtBOQDcgCiIhnFECAxG/cO8sXAQlEqnrSB/583/k+G7NY/Ed0Xceu16sL4BPYzC7QNI3bti2fgD3SMoAH+LhNVlXFJZy6rldTjcqyZKDxpNbFuRe5BSFQFOVLVdXTo+KiKMQ2YbiS2p9bMs9zjuhxG+BlWcaQ4xs56QAH0g4cYKRpagN3JHWTJNlC5wN1hjhD9x3pFXzEcSy6a5qm0HgqoHjNGBPbvFwumyU5IBfQbUd8DMi9U3EURTY6W8oiAQxd1/ec8x3N9fANuU9yAtzB+TsHGIZh7EdOzshHl0/gzgGFaZpiEUACjrbAk36easQhhmFIB7e2LOv07OqDHr+Ih+OBA7D0FgTBaq4Y86gbOPB9H2/Y6x/+w6NwgHuE1Y4PTn4OR6z7FWAAQxaHQOUXPKYAAAAASUVORK5CYII=",
        email_go: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAKBmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgIHhtbG5zOnBsdXNfMV89Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcFJpZ2h0czpNYXJrZWQ9IlRydWUiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMTEtMDEtMjVUMTM6NTU6MzUrMDE6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZERTlDNjY4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZERTlDNjY4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNkRFOUM2NjgyMjhFMDExOTg5Q0MwQTFBRDAyQjVDMiI+CiAgIDx4bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICAgPGRjOmNyZWF0b3I+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpPkdlbnRsZWZhY2UgY3VzdG9tIHRvb2xiYXIgaWNvbnMgZGVzaWduPC9yZGY6bGk+CiAgICA8L3JkZjpTZXE+CiAgIDwvZGM6Y3JlYXRvcj4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5XaXJlZnJhbWUgbW9ubyB0b29sYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6ZGVzY3JpcHRpb24+CiAgIDxkYzpzdWJqZWN0PgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaT5jdXN0b20gaWNvbiBkZXNpZ248L3JkZjpsaT4KICAgICA8cmRmOmxpPnRvb2xiYXIgaWNvbnM8L3JkZjpsaT4KICAgICA8cmRmOmxpPmN1c3RvbSBpY29uczwvcmRmOmxpPgogICAgIDxyZGY6bGk+aW50ZXJmYWNlIGRlc2lnbjwvcmRmOmxpPgogICAgIDxyZGY6bGk+dWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT5ndWkgZGVzaWduPC9yZGY6bGk+CiAgICAgPHJkZjpsaT50YXNrYmFyIGljb25zPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwvZGM6c3ViamVjdD4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Q3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1Ob25Db21tZXJjaWFsIGxpY2Vuc2U8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpyaWdodHM+CiAgIDxJcHRjNHhtcENvcmU6Q3JlYXRvckNvbnRhY3RJbmZvCiAgICBJcHRjNHhtcENvcmU6Q2lVcmxXb3JrPSJodHRwOi8vd3d3LmdlbnRsZWZhY2UuY29tIi8+CiAgIDxwbHVzXzFfOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpJbWFnZUNyZWF0b3JOYW1lPSJnZW50bGVmYWNlLmNvbSIvPgogICAgPC9yZGY6U2VxPgogICA8L3BsdXNfMV86SW1hZ2VDcmVhdG9yPgogICA8cGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1c18xXzpDb3B5cmlnaHRPd25lck5hbWU9ImdlbnRsZWZhY2UuY29tIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwvcGx1c18xXzpDb3B5cmlnaHRPd25lcj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6QTZERTlDNjY4MjI4RTAxMTk4OUNDMEExQUQwMkI1QzIiCiAgICAgIHN0RXZ0OndoZW49IjIwMTEtMDEtMjVUMTM6NTU6MzUrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+OSYnOgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA8dEVYdEFMVFRhZwBUaGlzIGlzIHRoZSBpY29uIGZyb20gR2VudGxlZmFjZS5jb20gZnJlZSBpY29ucyBzZXQuINhr6MQAAABEdEVYdENvcHlyaWdodABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVze92woAAAAEVpVFh0RGVzY3JpcHRpb24AAAAAAFRoaXMgaXMgdGhlIGljb24gZnJvbSBHZW50bGVmYWNlLmNvbSBmcmVlIGljb25zIHNldC4gvBH4GgAAAEhpVFh0Q29weXJpZ2h0AAAAAABDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVzWILLBQAAANRJREFUeNrEU0sKgzAQjaXZuhAEj2dO0nqD3iA5mWtBCCjJyk+aF6MEqy3ahQOPmczMew5mQsjlNgzDcxxHcwbgRl3XmX8GuFkV4iHg+75/UUqjLdiaCHsBopQyANS01tyf+fpLyKGGHn+eeE3TGGBubNuW+9wighg51IKc493dGIHFccyklAhz7zFqbp1IkoQFP9/5DwEYGuu6diI+JdI0Zavb2xeAgVBVlYuzLGMb1/9dYI94SODHAk4C9m5dUJbloYWaeZigsP5xchGL6x/jW4ABACR97SgICuuuAAAAAElFTkSuQmCC"
    },
    currentIdx: -1,
    mapAttempts: -1,
    lastImg: null,
    lastLocation: "",
    blueDotList: [],

    gotoUnread: function(){
        window.location.hash='home:m=ALL_UNREAD';
    },
    
    markAndNext: function(){
    
        if(NAV.lastImg){
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click",true,true,window,1,1,1,1,1,false,false,false,false,0,NAV.lastImg);
            NAV.lastImg.dispatchEvent(evt);
        
            if(NAV.blueDotList.length == 1){
                NAV.currentIdx = -1;
                NAV.mapAttempts = -1;
                NAV.lastImg = null;
                setTimeout(function(){
                    if(confirm('No more unread messages. Go back to list of unread messages?')){
                        NAV.gotoUnread();
                    }
                },1000);
            }
            else{
               NAV.currentIdx--;
               NAV.nextUnread();
            }
        }
        else NAV.nextUnread();
    },
    
    refreshBlueDotList: function(){ 

        if(NAV.lastLocation != window.location.hash){
            NAV.currentIdx = -1;
            NAV.mapAttempts = -1;
            NAV.lastImg = null;
            NAV.lastLocation = window.location.hash;
        }
    
        NAV.blueDotList = [];

        for(var i = 0;i<document.images.length;i++){
            var img = document.images[i];
            var bg = img.style.background;
            if(bg && bg.indexOf(NAV.imgs.blue_dot) != -1 && img.style.display == 'block'){
                NAV.blueDotList.push(img);
            }
        }

        // If we have a conversation map, make sure the unread messages count in there matches the number of blue dots we found
        var mapMatches = true;
        var mapArr = document.getElementsByClassName("MAP_REGION");
        var mapDiv = (mapArr && mapArr.length) ? mapArr[0] : null;
        if(mapDiv){
            var unreadBars = [];
            for(var k = 0;k < mapDiv.childNodes.length;k++){
                if(mapDiv.childNodes[k].firstChild.src == NAV.imgs.unread_map){
                    unreadBars.push(mapDiv.childNodes[k]);
                }
            }
            window.OSNH.log("Unread messages in map = " + unreadBars.length,"Unread dots found = " + NAV.blueDotList.length);
            if(unreadBars.length != NAV.blueDotList.length){
                mapMatches = false;

                NAV.mapAttempts = 0;// ++; 
                if(NAV.mapAttempts < unreadBars.length){
                    var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click",true,true,window,1,1,1,1,1,false,false,false,false,0,unreadBars[NAV.mapAttempts]);
                    unreadBars[NAV.mapAttempts].dispatchEvent(evt);
                }

                window.setTimeout(NAV.refreshBlueDotList,1000);
            }  
        }
    
        if(mapMatches){
            NAV.mapAttempts = -1;
            if(NAV.blueDotList.length > 0){
                NAV.nextUnreadByImg();
            }	
        }
    },
    
    nextUnread: function(){
        NAV.refreshBlueDotList();
    },
    
    nextUnreadByImg: function(){
        window.OSNH.log("HAX.nextUnread("+NAV.currentIdx+");");

        if(NAV.lastImg){
            NAV.lastImg.style.backgroundColor='transparent';
        }

        NAV.currentIdx++;
        if(NAV.currentIdx >= NAV.blueDotList.length){
            NAV.currentIdx = -1;
            NAV.mapAttempts = -1;
            NAV.lastImg = null;
            if(confirm('No more unread messages. Start again from the top?')){
                NAV.currentIdx = 0;
            }
        }

        if(NAV.currentIdx >= 0 && NAV.currentIdx < NAV.blueDotList.length){
            NAV.lastImg = NAV.blueDotList[NAV.currentIdx];
            NAV.lastImg.style.backgroundColor = 'lightGreen';
            NAV.lastImg.parentNode.scrollIntoView(false);        
        }
    },

    start: function(){

        window.OSNH.addToolbarButton(NAV.gotoUnread,"Unread message list","Ctrl+Alt+U",NAV.imgs.folder_page);
        window.OSNH.addToolbarButton(NAV.nextUnread,"Next unread message","Ctrl+Alt+N",NAV.imgs.email_go);
        window.OSNH.addToolbarButton(NAV.markAndNext,"Mark read and next","Ctrl+Alt+M",NAV.imgs.email_open);
    }
};
window.OSNH.nav = NAV;
window.OSNH.nav.start();
