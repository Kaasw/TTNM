from transformers import pipeline


SUMMARIZER = pipeline(task="summarization",
                      model="google/long-t5-tglobal-base",
                      tokenizer="google/long-t5-tglobal-base")


def summarize(input_text):
    # Define a reasonable max_length for the summary to ensure it's a paragraph
    max_length = len(input_text.split(' '))/2
    
    # Ensure min_length is sufficiently long to form a paragraph
    min_length = int(max_length // 2)  # Adjust as needed
    
    # Generate the summary with specified min and max lengths
    summary = SUMMARIZER(input_text, min_length=min_length, max_length=max_length, length_penalty=1.0, no_repeat_ngram_size=3)[0]['summary_text']
    
    return summary

