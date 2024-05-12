from transformers import pipeline


SUMMARIZER = pipeline(task="summarization",
                      model="google/long-t5-tglobal-base",
                      tokenizer="google/long-t5-tglobal-base")



def summarize(input_text):
    
    summary_len = int(len(input_text.split(' ')) / 2)
    summary = SUMMARIZER(input_text, max_new_tokens = summary_len)[0]['summary_text']
   
    return summary
