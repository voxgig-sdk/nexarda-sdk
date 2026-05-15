package core

type NexardaError struct {
	IsNexardaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNexardaError(code string, msg string, ctx *Context) *NexardaError {
	return &NexardaError{
		IsNexardaError: true,
		Sdk:              "Nexarda",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NexardaError) Error() string {
	return e.Msg
}
