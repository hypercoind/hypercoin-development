{{- define "hypercoin-dev.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{- define "hypercoin-dev.fullname" -}}
{{- .Release.Name -}}
{{- end -}}

{{- define "hypercoin-dev.labels" -}}
app.kubernetes.io/name: {{ include "hypercoin-dev.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "hypercoin-dev.selectorLabels" -}}
app.kubernetes.io/name: {{ include "hypercoin-dev.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
