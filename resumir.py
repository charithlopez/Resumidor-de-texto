import sys
import json

from transformers import BertTokenizerFast, EncoderDecoderModel


modelo = "mrm8488/bert2bert_shared-spanish-finetuned-summarization"

print("Cargando modelo...", file=sys.stderr)

tokenizer = BertTokenizerFast.from_pretrained(modelo)
model = EncoderDecoderModel.from_pretrained(modelo)

print("Modelo cargado.", file=sys.stderr)


for linea in sys.stdin:

    try:

        datos = json.loads(linea)

        texto = datos["texto"]
        longitud = datos["longitud"]

        if longitud == "corto":
            min_nuevos_tokens = 20
            max_nuevos_tokens = 60

        elif longitud == "mediano":
            min_nuevos_tokens = 40
            max_nuevos_tokens = 120

        else:
            min_nuevos_tokens = 60
            max_nuevos_tokens = 180

        entradas = tokenizer(
            [texto],
            padding="max_length",
            truncation=True,
            max_length=512,
            return_tensors="pt"
        )

        salida = model.generate(
            entradas.input_ids,
            attention_mask=entradas.attention_mask,
            min_new_tokens=min_nuevos_tokens,
            max_new_tokens=max_nuevos_tokens
        )

        resumen = tokenizer.decode(
            salida[0],
            skip_special_tokens=True
        )

        print(
            json.dumps(
                {"resumen": resumen},
                ensure_ascii=False
            ),
            flush=True
        )

    except Exception as error:

        print(
            json.dumps(
                {"error": str(error)},
                ensure_ascii=False
            ),
            flush=True
        )