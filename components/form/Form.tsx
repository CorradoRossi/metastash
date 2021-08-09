import { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from 'styles/form.module.css';

const EthereumAddressRegEx = /^0x[a-fA-F0-9]{40}$/;

export const Form = ({ initialAddress = '' }) => {
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    mode: 'all'
  });

  const onSubmit = (data: any) => console.log(data);
  const address = watch('address');

  useEffect(() => {
    if (isDirty && address && !errors.address) {
      router.push(`/owner/${address}`);
    }
  }, [isDirty, errors, address]);

  return (
    <div className="form-wrapper">
      <form
        className={styles['form default submit generate-with-github']}
        onSubmit={handleSubmit(onSubmit)}
      >
        Address:
        <div className={styles['form-row']}>
          <label
            htmlFor="address-input-field"
            className={cn(styles['input-label'], {
              [styles.focused]: focused
            })}
          >
            <input
              className={styles['input']}
              id="address-input-field"
              type="text"
              defaultValue={initialAddress}
              placeholder="0x88842069..."
              {...register('address', { pattern: EthereumAddressRegEx, required: true })}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            ></input>
          </label>
        </div>
      </form>
      <style jsx>{`
        .form-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        form {
          width: 320px;
          position: relative;
          margin: 0 2em;
        }
      `}</style>
    </div>
  );
};
